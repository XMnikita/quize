import { Component } from 'react'
import MenuTogle from '../components/navigation/MenuTogle/MenuTogle'
import Drawer from '../components/navigation/Drawer/Drawer'
import './Layout.css'
import Backdrop from '../components/UI/Backdrop/Backdrop'

class Layout extends Component {
  state = {
    menu: false,
  }

  togleMenu = () => {
    this.setState({
      menu: !this.state.menu,
    })
  }

  render() {
    return (
      <div className="Layout">
        {this.state.menu ? <Backdrop onClickHandler={this.togleMenu} /> : null}
        <Drawer onClickHandler={this.togleMenu} isOpen={this.state.menu} />
        <MenuTogle
          isOpen={this.state.menu}
          onTogle={this.togleMenu}
        ></MenuTogle>

        <main>{this.props.children}</main>
      </div>
    )
  }
}

export default Layout
