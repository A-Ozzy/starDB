import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorButton from '../error-buttons';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../servises/swapi-service';

import './app.css';
import PeoplePage from '../people-page';


export default class App extends Component {

   state = {
      showRandomPlanet: true,
      hasError: false,
   };

   swapiService = new SwapiService();

   toggleRandomPlanet = () => {
      this.setState((state) => {
         return {
            showRandomPlanet: !state.showRandomPlanet
         }
      });
   };

   onPersonSelected = (id) => {
      this.setState({
         selectedPerson: id,
      });
   }

   componentDidCatch() {
      console.log("err");
      this.setState({ hasError: true });
   }

   render() {

      if (this.state.hasError) {
         return <ErrorIndicator />
      }

      const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

      return (
         <div>
            <Header />
            {planet}
            <div className="buttons">
               <button
                  className="toggle-planet btn btn-warning btn-lg"
                  onClick={this.toggleRandomPlanet}>
                  Toggle Random Planet
               </button>
               <ErrorButton />
            </div>
            <PeoplePage/>
            {/* <div className="row mb2">
               <div className="col-md-6">
                  <ItemList
                     onItemSelected={this.onPersonSelected}
                     getData={this.swapiService.getAllPlanets}
                     renderItem={(item) => (<span>{item.name}</span>)}/>
               </div>
               <div className="col-md-6">
                  <PersonDetails personId={this.state.selectedPerson} />
               </div>
            </div> */}
         </div >
      );
   }

};

