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

import CardTable from '@components/tables/subtable';
import Modal from 'react-modal';
import styles from './style.scss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class FirstPage extends Component {
  state = {
    decks: [],
    firstValue: 0,
    showModal: false,
  };

  componentDidMount() {
    axios
      .get('https://magic-tracker-api.herokuapp.com/api/v1?')
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
  }

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
          const alt = { [index]: expanded[index] ? false : true };

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
    this.subtitle.style.color = '#f00';
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      addFirstTotal,
      addSecondTotal,
      first_total,
      second_total,
      subFirstTotal,
      subSecondTotal,
    } = this.props;
    const { firstValue, decks, showModal } = this.state;

    const columns = [
      {
        accessor: 'name',
        Header: 'Name',
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
          defaultPageSize={20}
          className="-striped -highlight"
          getTdProps={this.handleFullRowClick}
          SubComponent={row => <CardTable set={row.original} />}
        />

        <Modal
          isOpen={showModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
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
