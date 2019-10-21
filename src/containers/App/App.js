import React, { Component } from "react";

import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

import format from "date-fns/format";

import { TitleH1, TitleH2 } from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Case from "../../components/Case/Case";

import { getUniqId } from "../../utils";

import "./style.css";
import info from "../../static/icons/information.svg";

class App extends Component {
  state = {
    listCases: JSON.parse(localStorage.getItem("listCases")) || [],
    titleCase: "",
    descriptionCase: "",
    dateCase: format(new Date(), "yyyy-MM-dd"),
    priorities: [
      { title: "Приорет I", value: 5 },
      { title: "Приорет II", value: 4 },
      { title: "Приорет III", value: 3 },
      { title: "Приорет IV", value: 2 },
      { title: "Приорет V", value: 1 }
    ],
    priorityCase: "5",
    isEdit: false,
    id: "",
    activeOption: ""
  };

  static getDerivedStateFromProps(props, state) {
    if (JSON.parse(localStorage.getItem("listCases")) !== state.listCases) {
      return {
        listCases: JSON.parse(localStorage.getItem("listCases"))
      };
    }
  }

  addCase = () => {
    const { titleCase, descriptionCase, dateCase, priorityCase } = this.state;
    let listCases = JSON.parse(localStorage.getItem("listCases"));
    if (!titleCase.length) {
      return NotificationManager.error(
        "Имя задачи не может быть пустым",
        "Ошибка",
        2000
      );
    }

    if (listCases === null) {
      listCases = [];
    }

    const caseItem = {
      id: getUniqId(),
      title: titleCase,
      description: descriptionCase,
      date: !dateCase.length ? format(new Date(), "yyyy-MM-dd") : dateCase,
      priority: priorityCase,
      value: parseInt(priorityCase),
      isCompleted: false
    };

    listCases = [...listCases, caseItem];

    localStorage.setItem("listCases", JSON.stringify(listCases));

    this.setState({
      titleCase: "",
      descriptionCase: ""
    });
  };

  removeCase = id => {
    let blogList = JSON.parse(localStorage.getItem("listCases")).filter(
      item => item.id !== id
    );
    localStorage.setItem("listCases", JSON.stringify(blogList));
    this.forceUpdate();
  };

  completeCase = id => {
    const listCases = JSON.parse(localStorage.getItem("listCases")).map(item =>
      item.id === id
        ? {
            ...item,
            isCompleted: true
          }
        : { ...item }
    );
    localStorage.setItem("listCases", JSON.stringify(listCases));
    this.forceUpdate();
  };

  onEdit = id => {
    const editedItem = JSON.parse(localStorage.getItem("listCases")).filter(
      item => item.id === id
    )[0];
    const { title, description, date, priority } = editedItem;
    this.setState({
      titleCase: title,
      descriptionCase: description,
      isEdit: true,
      dateCase: date,
      priorityCase: priority,
      id
    });
  };

  cancelEdit = () => {
    this.setState({
      titleCase: "",
      descriptionCase: "",
      isEdit: false,
      priorityCase: "5",
      id: ""
    });
  };

  confirmEdit = () => {
    const {
      titleCase,
      descriptionCase,
      dateCase,
      priorityCase,
      id
    } = this.state;

    if (!titleCase.length) {
      return NotificationManager.error(
        "Имя задачи не может быть пустым",
        "Ошибка",
        2000
      );
    }
    const listCases = JSON.parse(localStorage.getItem("listCases")).map(item =>
      item.id === id
        ? {
            ...item,
            title: titleCase,
            description: descriptionCase,
            date: dateCase,
            priority: priorityCase
          }
        : { ...item }
    );

    localStorage.setItem("listCases", JSON.stringify(listCases));

    this.setState(
      {
        isEdit: false,
        titleCase: "",
        descriptionCase: "",
        dateCase: format(new Date(), "yyyy-MM-dd"),
        priorityCase: "5"
      },
      () => NotificationManager.success("Задача редактирована", "Успешно", 2000)
    );
  };

  handleCaseData = (e, field) => {
    this.setState({
      [field]: e.target.value
    });
  };

  clearStore = () => {
    localStorage.clear();
    this.forceUpdate();
  };

  render() {
    const {
      listCases,
      titleCase,
      descriptionCase,
      dateCase,
      priorities,
      isEdit,
      priorityCase
    } = this.state;
    console.log(localStorage);
    return (
      <div className="app">
        <div className="app__title">
          <TitleH1 title="TODO-лист" onClick={this.clearStore} />
          <img
            src={info}
            alt="Информация"
            title="Чтобы очистить localStorage - двойной клик по 'TODO-лист'"
          ></img>
        </div>
        {listCases === null || !listCases.length ? (
          <TitleH2 title="Список дел пуст" />
        ) : (
          listCases.map(caseItem => (
            <Case
              key={caseItem.id}
              id={caseItem.id}
              title={caseItem.title}
              description={caseItem.description}
              date={caseItem.date}
              priority={caseItem.priority}
              onRemove={this.removeCase}
              onComplete={this.completeCase}
              onEdit={this.onEdit}
              isEdit={isEdit}
              isCompleted={caseItem.isCompleted}
            />
          ))
        )}
        <div className="app__top">
          <Input
            type="text"
            placeholder="Введите имя задачи"
            value={titleCase}
            onChange={e => this.handleCaseData(e, "titleCase")}
          />
          <Input
            type="date"
            value={dateCase}
            onChange={e => this.handleCaseData(e, "dateCase")}
          />

          <Input
            type="select"
            value={dateCase}
            onChange={e => this.handleCaseData(e, "priorityCase")}
            priorities={priorities}
            priorityCase={priorityCase}
          />
        </div>
        <div className="app__bottom">
          <Input
            type="textarea"
            placeholder="Введите описание"
            value={descriptionCase}
            onChange={e => this.handleCaseData(e, "descriptionCase")}
          />
        </div>
        <div className="app_bottom">
          {isEdit ? (
            <>
              <Button
                title="Подтвердить"
                onClick={this.confirmEdit}
                className="btn-green"
              />
              <Button title="Отмена" onClick={this.cancelEdit} />
            </>
          ) : (
            <Button title="Ввод" onClick={this.addCase} />
          )}
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
