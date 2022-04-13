import React from 'react';
import ItemList from '../item-list';
import {
   withData,
   withSwapiService,
   compose,
   withChildFunc
} from '../hoc-helpers';


const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ model, name }) => <span>{name} ({model})</span>;

const mapPersonMethodsToProps = (swapiService) => {
   return {
      getData: swapiService.getAllPeople
   };
};

const mapPlanetMethodsToProps = (swapiService) => {
   return {
      getData: swapiService.getAllPlanets
   };
};

const mapStarshipMethodsToProps = (swapiService) => {
   return {
      getData: swapiService.getAllStarships
   };
};


const PersonList = compose(
                      withSwapiService(mapPersonMethodsToProps),
                      withData,
                      withChildFunc(renderName))
                     (ItemList);

const PlanetList = compose(
                     withSwapiService(mapPlanetMethodsToProps),
                     withData,
                     withChildFunc(renderName))
                     (ItemList); 
                     
const StarshipList = compose(
                     withSwapiService(mapStarshipMethodsToProps),
                     withData,
                     withChildFunc(renderModelAndName))
                     (ItemList); 


export {
   PersonList,
   PlanetList,
   StarshipList
};