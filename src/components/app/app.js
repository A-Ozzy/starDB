import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../servises/swapi-service';
import DummySwapiService from '../../servises/dummy-swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';
import ErrorBoundry from '../error-boundry/error-boundry';
import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';
import Row from '../row';

import './app.css';

export default class App extends Component {

   state = {
      hasError: false,
      swapiService: new SwapiService()
   };

   onServiceChange = () => {
      this.setState(({ swapiService }) => {
         const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

         console.log('switched to', Service.name);

         return {
            swapiService: new Service()
         };
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

      return (
         <ErrorBoundry>
            <SwapiServiceProvider value={this.state.swapiService}>
               <div className='stardb-app'>
                  <Header onServiceChange={this.onServiceChange} />
                  <RandomPlanet />
                  <PeoplePage /> 
                  <PlanetsPage />
                  <StarshipsPage/>
                 
               </div>
            </SwapiServiceProvider >
         </ErrorBoundry>

      );
   }

};

