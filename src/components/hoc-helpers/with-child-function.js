import React from 'react';

const withChildFunc = (fn) => (Wrapped) => {
   return (props) => {
      return (
         <Wrapped {...props}>
            {fn}
         </Wrapped>
      );
   };
};


export default withChildFunc;