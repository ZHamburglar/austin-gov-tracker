import React, { Component } from 'react';
import { shape } from 'prop-types';
import ReactTable from 'react-table';
import axios from 'axios';

import { Divider, Modal, ModalTitle } from '@UIComponents';

import styles from './style.scss';

class CardTable extends Component {
  state = {
    card_list: [],
    selected_card: {},
    showModal: false,
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

  setCardModal = card => {
    console.log('row: ', card);
    this.setState({ selected_card: card, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  onClose = () => {
    this.setState({ selected_card: {} });
  };

  render() {
    const {
      set: { cards },
    } = this.props;

    const { card_list, selected_card, subTotal, showModal } = this.state;

    const columns = [
      {
        accessor: 'name',
        Cell: row => {
          return (
            <div className={styles.card_table_col}>
              <div>
                <div className={styles.card_name}>{row.original.name}</div>
                <div>
                  <img
                    src={row.original.image_uris.border_crop}
                    className={styles.card_image}
                    onClick={() => this.setCardModal(row.original)}
                  />
                </div>
              </div>
            </div>
          );
        },
        Header: 'Card',
        minWidth: 150,
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

        <Modal
          isOpen={showModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          onClose={this.onClose}
        >
          {Object.entries(selected_card).length && (
            <>
              <ModalTitle>{selected_card.name}</ModalTitle>
              <div className="p-2">
                <img
                    src={selected_card.image_uris.border_crop}
                    className={styles.card_image}
                  />
                <div>This is part 1</div>
                <div>This is part 1</div>
                <Divider />
                <div>This is part 1</div>
              </div>
            </>
          )}
        </Modal>
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
