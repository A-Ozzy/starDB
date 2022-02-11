import React, { Component } from 'react';
import SwapiService from "../../servises/swapi-service";
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator/error-indicator';
import ErrorButton from '../error-buttons/error-button';

import './person-details.css';

export default class PersonDetails extends Component {

   swapiService = new SwapiService();

   state = {
      person: null,
      loading: true,
      error: false,
   };

   componentDidMount() {
      this.updatePerson();
   }

   componentDidUpdate(prevProps) {
      if (this.props.personId !== prevProps.personId) {
         this.updatePerson();
      }
   }

   onError = (err) => {
      this.setState({
         error: true,
         loading: false,
      });
   }

   onPersonDetailsLoaded = (person) => {
      this.setState({
         person,
         loading: false
      });
   }

   updatePerson() {
      const { personId } = this.props;

      if (!personId) {
         return
      }

      this.swapiService
         .getPerson(personId)
         .then(this.onPersonDetailsLoaded)
         .catch(this.onError)
   }
   render() {
      
      if (!this.state.person) {
         return <span>Select a person from a list</span>;
      }

      const { person, loading, error } = this.state;

      const hasData = (!loading || error);
      
      const spinner = loading ? <Spinner /> : null;
      const errorMessage = error ? <ErrorIndicator /> : null;
      const content = hasData ? <PeopleView person={person} /> : null;


      return (
         <div className="person-details card">
            {spinner}
            {content}
            {errorMessage}
            
         </div>
      )
   }
}

const PeopleView = ({ person }) => {
   const { id, name, gender, birthYear, eyeColor } = person;


   return (
      <React.Fragment>
         <img className="person-image"
            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />
         <div className="card-body">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
               <li className="list-group-item">
                  <span className="term">Gender</span>
                  <span>{gender}</span>
               </li>
               <li className="list-group-item">
                  <span className="term">Birth Year</span>
                  <span>{birthYear}</span>
               </li>
               <li className="list-group-item">
                  <span className="term">Eye Color</span>
                  <span>{eyeColor}</span>
               </li>
            </ul>
            <ErrorButton/>
         </div>
      </React.Fragment>
   )
}