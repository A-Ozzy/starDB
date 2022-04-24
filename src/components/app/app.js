import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../servises/swapi-service';
import DummySwapiService from '../../servises/dummy-swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';
import ErrorBoundry from '../error-boundry/error-boundry';
import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
               <Router>

                  <div className='stardb-app'>
                     <Header onServiceChange={this.onServiceChange} />
                     <RandomPlanet />
                     <Routes>
                        <Route path="*" element={ <h2>Welcome to StarDB</h2>}  />
                        <Route path="/people" element={ <PeoplePage/> } />
                        <Route path="/planets" element={<PlanetsPage />} />
                        <Route path="/starships" element={ <StarshipsPage/> } />
                        <Route path="/starships/:id" element={<StarshipDetails />}/>
                                                
                     </Routes>
                  </div>

               </Router>
            </SwapiServiceProvider >
         </ErrorBoundry >

      );
   }

};

