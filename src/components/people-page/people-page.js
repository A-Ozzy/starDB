import React, { Component } from "react";
import ErrorIndicator from "../error-indicator";
import ItemList from '../item-list';
import PersonDetails from '../item-details';
import Row from '../row';
import SwapiService from "../../servises/swapi-service";
import ErrorBoundry from "../error-boundry/error-boundry";

import './people-page.css';

export default class PeoplePage extends Component {

   swapiService = new SwapiService();

   state = {
      selectedPerson: null,
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
            renderItem={({ name, gender, birthYear }) => (`${name} (${gender},  ${birthYear})`)} >

            {(i) => (
               `${i.name} (${i.birthYear})`
            )}
         </ItemList>
      );

      const personDetails = (
         <ErrorBoundry>
            <PersonDetails personId={this.state.selectedPerson} />
         </ErrorBoundry>

      );

      return (
         <Row left={itemList} right={personDetails} />
      )
   }
}