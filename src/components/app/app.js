import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../servises/swapi-service';
import DummySwapiService from '../../servises/dummy-swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';
import ErrorBoundry from '../error-boundry/error-boundry';
import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StarshipDetails from "../sw-components/starship-details";

import './app.css';
import { element } from 'prop-types';

export default class App extends Component {

   state = {
      hasError: false,
      swapiService: new SwapiService()
   };

   onServiceChange = () => {
      this.setState(({ swapiService }) => {
         const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

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
               <BrowserRouter>

                  <div className='stardb-app'>
                     <Header onServiceChange={this.onServiceChange} />
                     <RandomPlanet />
                     {/* <Switch> */}
                        <Route path="/" render={()=> <h2>Welcome to StarDB</h2>} exact />
                        <Route path="/people/:id?" component={ PeoplePage } />
                        <Route path="/planets" component={PlanetsPage} />
                        <Route path="/starships" component={ StarshipsPage} />
                        <Route path="/starships/:id" render={({ id }) => { <StarshipDetails id={id}/>}}/>
                                                
                     {/* </Switch> */}
                  </div>

               </BrowserRouter>
            </SwapiServiceProvider >
         </ErrorBoundry >

      );
   }

};

