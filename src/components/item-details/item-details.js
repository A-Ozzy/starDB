import React, { Component } from 'react';
import SwapiService from "../../servises/swapi-service";
import ErrorButton from '../error-buttons/error-button';

import './item-details.css';


const Record = ({ item, field, label }) => {
   return (
      <li className="list-group-item">
         <span className="term">{label}</span>
         <span>{item[field]}</span>
      </li>
   );
};

export {
   Record
};



export default class ItemDetails extends Component {

   swapiService = new SwapiService();

   state = {
      item: null,
      image: null,
   };

   componentDidMount() {
      this.updateItem();
   }

   componentDidUpdate(prevProps) {
      if (this.props.itemId !== prevProps.itemId) {
         this.updateItem();
      }
   }

   updateItem() {
      // console.log(this.props);

      const { itemId, getData, getImageUrl } = this.props;

      if (!itemId) {
         return
      }

      getData(itemId)
         .then((item) => {
            console.log(item);
            this.setState({
               item,
               image: getImageUrl(item),
            });
         });
   }

   render() {

      const { item, image } = this.state;

      if (!item) {
         return <span>Select a item from a list</span>;
      }

      const { id, name, gender,
         birthYear, eyeColor } = item;

      return (
         <div className="item-details card">
            <img className="item-image"
               src={image}
               alt="character" />

            <div className="card-body">
               <h4>{name}</h4>
               <ul className="list-group list-group-flush">
                  {
                     React.Children.map(this.props.children, (child, idx) => {
                        return React.cloneElement(child, {item})
                     })
                  }
                  {/* <li className="list-group-item">
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
                  </li> */}
               </ul>
               <ErrorButton />
            </div>
         </div>
      );
   }
}

// const PeopleView = ({ item }) => {
//    const { id, name, gender, birthYear, eyeColor } = item;

//    return (
//       <React.Fragment>
//          <img className="person-image"
//             src={image} />
//          <div className="card-body">
//             <h4>{name}</h4>
//             <ul className="list-group list-group-flush">
//                <li className="list-group-item">
//                   <span className="term">Gender</span>
//                   <span>{gender}</span>
//                </li>
//                <li className="list-group-item">
//                   <span className="term">Birth Year</span>
//                   <span>{birthYear}</span>
//                </li>
//                <li className="list-group-item">
//                   <span className="term">Eye Color</span>
//                   <span>{eyeColor}</span>
//                </li>
//             </ul>
//             <ErrorButton />
//          </div>
//       </React.Fragment>
//    )
// }