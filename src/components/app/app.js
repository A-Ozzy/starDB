import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemDetails, { Record } from '../item-details/item-details';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../servises/swapi-service';

import './app.css';
import ErrorBoundry from '../error-boundry/error-boundry';
import Row from '../row';


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

      const { getPerson, getStarship, getStarshipImage, getPersonImage } = this.swapiService;

      const personDitails = (
         <ItemDetails itemId={11}
            getData={getPerson}
            getImageUrl={getPersonImage}>

            <Record field="gender" label="Gender" />
            <Record field="eyeColor" label="Eye Color" />

         </ItemDetails>
      );

      const starshipDitails = (
         <ItemDetails itemId={5}
            getData={getStarship}
            getImageUrl={getStarshipImage}>

            <Record field="model" label="Model" />
            <Record field="length" label="Lelgth" />
            <Record field="costInCredits" label="Cost" />

         </ItemDetails>
      );

      return (
         <ErrorBoundry>
            <div className='stardb-app'>
               <Header />

               <Row left={personDitails} right={starshipDitails} />
            </div>


         </ErrorBoundry>
      );
   }

};

