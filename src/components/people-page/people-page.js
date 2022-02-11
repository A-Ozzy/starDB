import React, { Component } from "react";
import ErrorIndicator from "../error-indicator";
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import Row from '../row';
import SwapiService from "../../servises/swapi-service";

import './people-page.css';

export default class PeoplePage extends Component {

   swapiService = new SwapiService();

   state = {
      selectedPerson: null,
      hasError: false,
   }

   componentDidCatch() {
      this.setState({
         hasError: true,
      });
   }

   onPersonSelected = (id) => {
      this.setState({
         selectedPerson: id,
      });
   }

   render() {

      if (this.state.hasError) {
         return <ErrorIndicator />
      }

      const itemList = (
         <ItemList
            onItemSelected={this.onPersonSelected}
            getData={this.swapiService.getAllPeople}
            renderItem={({ name, gender, birthYear }) => (`${name} (${gender},  ${birthYear})`)} />
      );

      const personDetails = (
         <PersonDetails personId={this.state.selectedPerson} />
      );

      return (
         <Row left={ itemList } right={ personDetails }/>
      )
   }
}