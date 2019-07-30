import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { func, number } from 'prop-types';
import ReactTable from 'react-table';
import axios from 'axios';

import {
  addFirstTotal,
  addSecondTotal,
  subFirstTotal,
  subSecondTotal,
} from '@modules/Calculator/actions';
import { getFirstTotal, getSecondTotal } from '@modules/Calculator/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CardTable from '@components/tables/subtable';
import { Divider, Icon, Pagination, Modal, ModalTitle } from '@UIComponents';
import styles from './style.scss';

class FirstPage extends Component {
  state = {
    currentPage: 1,
    decks: [],
    firstValue: 0,
    pageSize: 15,
    showModal: false,
  };

  componentDidMount() {
    this.getCardList();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage } = this.state;
    if (prevState.currentPage !== currentPage) {
      this.getCardList();
    }
  }

  getCardList = () => {
    const { currentPage, pageSize } = this.state;
    this.setState({ deck: [] });
    let url = 'https://magic-tracker-api.herokuapp.com/api/v1?';
    url += `offset=${pageSize * currentPage}`;
    url += `&limit=${pageSize}`;
    axios
      .get(url)
      .then(response => {
        // handle success
        this.setState({
          decks: response.data,
        });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  /**
   * Change Current Page
   *
   * @param {Number} page [Current Page]
   */
  changeCurrentPage = page => {
    this.setState({ currentPage: page });
  };

  /**
   * Change Page Limit
   *
   * @param {Number} page [Current Page]
   */
  changeLimit = size => {
    this.setState({ pageSize: size });
  };

  /**
   * Handle Click on Full Row to expand
   *
   * @return {Object}
   */
  handleFullRowClick = (state, rowInfo, col, instance) => {
    return {
      onClick: (e, handleOriginal) => {
        if (col.id == 'actions' || col.id == 'expander') {
          handleOriginal();
        } else {
          const { expanded } = state;
          const index = rowInfo.nestingPath[0];
          const alt = { [index]: !expanded[index] };

          instance.setState({
            expanded: { ...expanded, ...alt },
          });
        }
      },
      style: {
        cursor: 'pointer',
        maxWidth: 'none',
      },
    };
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    console.log('');
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  onClose = () => {
    console.log('modal closed');
  }

  render() {
    const {
      addFirstTotal,
      addSecondTotal,
      first_total,
      second_total,
      subFirstTotal,
      subSecondTotal,
    } = this.props;
    const { firstValue, decks, showModal, pageSize, currentPage } = this.state;

    const columns = [
      {
        accessor: 'name',
        Header: 'Card',
      },
      {
        accessor: 'card_count',
        Header: 'Card Count',
      },
      {
        accessor: 'set_name',
        Header: 'Set',
      },
      {
        accessor: 'release_date',
        Header: 'Release Date',
      },
      {
        Header: 'Expand',
        expander: true,
        Header: () => <strong>More</strong>,
        width: 65,
        Expander: ({ isExpanded, ...rest }) => (
          <div>
            {isExpanded ? <span>&#x2299;</span> : <span>&#x2295;</span>}
          </div>
        ),
        style: {
          cursor: 'pointer',
          fontSize: 25,
          padding: '0',
          textAlign: 'center',
          userSelect: 'none',
        },
      },
    ];

    return (
      <div>
        <p>First Page here</p>
        <div className={styles.localcolor}>This is local text.</div>
        <div className="global-text">This is the global text.</div>
        <div className="global-text">{firstValue}</div>
        <button onClick={() => this.setState({ showModal: !showModal })}>
          Show Modal
        </button>
        <div className="pb-2">
          <div className="d-inline-block">
            <button onClick={() => addFirstTotal()}>Add +</button>
          </div>
          <div className="d-inline-block px-2 text-hover-red">
            First Total: {first_total}
          </div>
          <div className="d-inline-block">
            <button onClick={() => subFirstTotal()}>Sub -</button>
          </div>
        </div>
        <div className="pb-1">
          <div className="d-inline-block">
            <button onClick={() => addSecondTotal()}>Add +</button>
          </div>
          <div className="d-inline-block px-2 text-hover-blue">
            Second Total: {second_total}
          </div>
          <div className="d-inline-block">
            <button onClick={() => subSecondTotal()}>Sub -</button>
          </div>
        </div>
        <ReactTable
          data={decks}
          columns={columns}
          showPagination={false}
          defaultPageSize={pageSize}
          className="-striped -highlight"
          getTdProps={this.handleFullRowClick}
          SubComponent={row => <CardTable set={row.original} />}
        />

        <Pagination
          sizeOptions={[5, 10, 15, 25]}
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={200}
          onPageChange={v => this.changeCurrentPage(v)}
          // onPageSizeChange={v => {
          //   this.changeLimit(v);
          //   this.changeCurrentPage(1);
          // }}
        />

        <Modal
          isOpen={showModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          onClose={this.onClose}
        >
          <ModalTitle>This Title</ModalTitle>
          <div>
            <div>This islkewjrwekre wekrjwelkrjwelkr lkjwerlkwejrklwej lkwjerklwej part 1</div>
            <div>This is part 1</div>
            <div>This is part 1</div>
            <Divider />
            <div>This is part 1</div>
          </div>
        </Modal>
      </div>
    );
  }
}

/**
 * Define component props
 */
FirstPage.propTypes = {
  addFirstTotal: func.isRequired,
  addSecondTotal: func.isRequired,
  first_total: number.isRequired,
  second_total: number.isRequired,
  subFirstTotal: func.isRequired,
  subSecondTotal: func.isRequired,
};

/**
 * Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  first_total: getFirstTotal(),
  second_total: getSecondTotal(),
});

/**
 * Export the component
 */
export default connect(
  mapStateToProps,
  {
    addFirstTotal,
    addSecondTotal,
    subFirstTotal,
    subSecondTotal,
  }
)(FirstPage);
