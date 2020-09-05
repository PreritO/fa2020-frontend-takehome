'use strict';
const CORS = 'https://cors-anywhere.herokuapp.com/';
const URL = 'https://founders-takehome-api.herokuapp.com/api/fetch';

class Table extends React.Component {
    state = {
        isLoading: true,
        foodItems: [],
        error: null
      };

    componentDidMount() {
        // We can grearte our own proxy here or we can use suggestion #2 from this link: 
        // https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
        fetch(CORS+URL)
            .then(res => res.json())
            .then((data) => {
                if(data.length!=0 && data!=null) {
                    this.setState({
                        foodItems: data,
                        isLoading: false,
                      })
                } else {
                    console.log("Data length = 0");
                }
            })
            .catch(error => this.setState({ error, isLoading: true }));
    }

    render() {
        const { isLoading, foodItems, error } = this.state;
        if (foodItems.length!=0 && foodItems!=null) {
          return (
            <React.Fragment>
              <center> <h1>Food Items</h1></center>
              {error ? <p>{error.message}</p> : null}
              <table>
                  <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Carbs</th>
                        <th>Calories</th>
                    </tr>
                  </thead>
                  <tbody>
              {foodItems!=null && foodItems.length!=0 ? (
                foodItems.foods.map(items => {
                  return (
                    // There should be a unique key here for each item for completeness
                    <tr>
                        <th>{items.name}</th>
                        <th>{items.quantity}</th>
                        <th>{items.carbohydrates}</th>
                        <th>{items.calories}</th>
                    </tr>   
                  );
                })
              ) : (
                  <center>
                       <h3>Loading...</h3>
                  </center>
              )}
              </tbody>
              </table>
            </React.Fragment>
          );  
        } else {
            return (
                <React.Fragment>
                    <h1>loading...</h1>
                </React.Fragment>
            );
        }        
    }
}


const domContainer = document.querySelector('#table');
ReactDOM.render( <Table />, domContainer);