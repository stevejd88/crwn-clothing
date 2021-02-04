import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.collections';
import CollectionPage from '../collection/collection.component';

import {
  firestore,
  convertCollectionsSnapshotMap
} from '../../firebase/firebase.utils';

class ShopPage extends Component {
  unsubscripeFromSnapshot = null;

  componentDidMount() {
    const collectionRef = firestore.collection('collections');

    collectionRef.onSnapshot(async (snapshot) => {
      convertCollectionsSnapshotMap(snapshot);
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionID`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

export default ShopPage;
