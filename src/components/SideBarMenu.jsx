import React from 'react';
import { Link } from 'react-router-dom';

import Backdrop from './Backdrop';

const SideBarMenu = (props) => {
  let comp_name, groups_dropdown;

  if (props.groups && props.groups.length >= 1) {
    groups_dropdown = props.groups.map(group => {
      return (
        <li className="side-bar-menu__sub-link" key={`group-single-select-${group._id}`}>
          <Link to={`/group/${group._id}`}>{group.group_name}</Link>
        </li>
      )
    })
  }

  if (props.competition && props.competition.name) {
    comp_name = props.competition.name;
  }

  return (
    <React.Fragment>
      <Backdrop show={props.showMenu} clicked={props.close} />
      <div className={`side-bar-menu ${ props.showMenu ? 'isVisible' : 'hidden'}`} onClick={props.close}>
        <span className="side-bar-menu__close-button" onClick={props.close}><img src={`${window.location.origin}/icons/close.svg`} alt=""/></span>
        <p className="side-bar-menu__competition-name">
          <Link to="/">{comp_name}</Link>
        </p>
        <ul className="side-bar-menu__links">
          <li className="side-bar-menu__link">
            <Link to="/scoreboard">Scoreboard</Link>
          </li>
          <li className="side-bar-menu__link">
            <Link to="/scoreboard">Seeding - Update Link</Link>
          </li>
          <li className="side-bar-menu__link">
            <Link to="/roster">Roster</Link>
          </li>
          <li className="side-bar-menu__link">
            <Link to="/scoreboard">Bracket - Update Link</Link>
          </li>
          <li className="side-bar-menu__link side-bar-menu__sub-links-btn">
            <Link to="/groups">Groups</Link>
            <ul className="side-bar-menu__sub-links">
              {
                groups_dropdown
              }
            </ul>
          </li>
            
        </ul>
      </div>
    </React.Fragment>
    
  ); 
}

export default SideBarMenu;