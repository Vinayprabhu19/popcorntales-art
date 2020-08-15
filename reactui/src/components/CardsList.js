import React, { Suspense, lazy, Component } from 'react';
import GridList from '@material-ui/core/GridList';
const CardLayout = lazy(() => import('./CardLayout'));
import Spinner from 'react-bootstrap/Spinner';
import Grid from '@material-ui/core/Grid';
class CardsList extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return <Grid
    container
    spacing={0}
    alignItems="center"
    justify="center"  style={{padding:"20px"}}
  >
    {
    this.props.designs.map(image => (
       <Suspense key={image.title} fallback={<Spinner />}>
        <CardLayout key={image.title} design={image}/>
        </Suspense>
    ))}
  </Grid>
  }
}

export default CardsList;
