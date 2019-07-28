import React, { Component } from 'react';
import { shape } from 'prop-types';
import ReactTable from 'react-table';
import axios from 'axios';

class CardTable extends Component {
  state = {
    card_list: [],
    subTotal: 0,
  };

  componentDidMount() {
    this.fetchScryData();
  }

  fetchScryData = () => {
    const { set } = this.props;
    const collection = { identifiers: [] };
    set.cards.forEach(card => {
      collection.identifiers.push({ multiverse_id: card.multiverseid });
    });
    axios
      .post('https://api.scryfall.com/cards/collection', collection)
      .then(response => {
        // handle success
        const card_response = response.data.data;
        let subTotal = 0;
        card_response.map(card => {
          const common = set.cards.find(
            commonCard => commonCard.multiverseid === card.multiverse_ids[0]
          );
          card.count = common.count;
          card.is_foil = common.foil;
          subTotal +=
            card.count *
            (card.is_foil ? card.prices.usd_foil : card.prices.usd);
          return card;
        });
        // console.log('card list: ', card_response);
        this.setState({
          card_list: card_response,
          subTotal,
        });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  render() {
    const {
      set: { cards },
    } = this.props;

    const { card_list, subTotal } = this.state;

    const columns = [
      {
        accessor: 'name',
        Header: 'Name',
      },
      {
        accessor: 'rarity',
        Header: 'Rarity',
        Cell: row => (
          <div>
            {row.original.rarity.charAt(0).toUpperCase() +
              row.original.rarity.slice(1)}
          </div>
        ),
      },
      {
        accessor: 'count',
        Header: 'Card Count',
      },
      {
        accessor: 'prices.usd',
        Header: 'Price',
        Cell: row => (
          <div>
            $
            {row.original.is_foil
              ? row.original.prices.usd_foil
              : row.original.prices.usd}
          </div>
        ),
        Footer: <div>Total: ${subTotal.toFixed(2)}</div>,
      },
    ];

    return (
      <div className="m-3">
        <ReactTable
          data={card_list}
          columns={columns}
          showPagination={false}
          defaultPageSize={cards.length}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

/**
 * Define component props
 */
CardTable.propTypes = {
  set: shape({}).isRequired,
};

/**
 * Export the component
 */
export default CardTable;
