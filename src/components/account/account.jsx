import React from 'react';
import { Link } from 'react-router-dom';
import { getValidatorsInfo } from '../../utils/search/utils';
import { formatValidatorAddress } from '../../utils/utils';
import { Dots } from '../ui/Dots';

class Account extends React.Component {
  constructor(props) {
    super(props);
    const { address } = this.props;
    this.state = {
      account: `/network/euler-5/contract/${address}`,
      moniker: address,
      loading: true,
    };
  }

  componentDidMount() {
    const { address } = this.props;
    if (address) {
      if (address.includes('cybervaloper')) {
        this.updateAccount();
      } else {
        this.setState({
          account: `/network/euler-5/contract/${address}`,
          moniker: `${formatValidatorAddress(address, 9, 6)}`,
          loading: false,
        });
      }
    }
  }

  updateAccount = async () => {
    const { address } = this.props;

    const result = await getValidatorsInfo(address);

    if (result) {
      this.setState({
        account: `/network/euler-5/hero/${address}`,
        moniker: `${result.description.moniker}`,
        loading: false,
      });
    }
  };

  render() {
    const { moniker, account, loading } = this.state;
    const { children } = this.props;

    if (loading) {
      return <Dots />;
    }

    return (
      <span>
        <Link to={account}>{moniker}</Link>
        {children}
      </span>
    );
  }
}

export default Account;
