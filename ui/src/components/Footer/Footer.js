/*eslint-disable*/
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import brazilFlag from "assets/img/brazil-flag.png";
import styles from "assets/jss/material-kit-react/components/footerStyle.js";
// nodejs library that concatenates classes
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";


const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont, fixed } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
    [classes.fixed]: fixed
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            
            <ListItem className={classes.inlineBlock}>
            
              <a
                href="https://github.com/temalcoolgel/temalcoolgel"
                className={classes.block}
                placeholder="Github"
                target="_blank"
              >
                <i className={classes.socialIcons + " fab fa-github"} />
              </a>
            </ListItem>
             <ListItem className={classes.inlineBlock}>
              <a
                href="https://github.com/orgs/temalcoolgel/people"
                className={classes.block}
                target="_blank"
              >
                Quem somos
              </a>
            </ListItem>
            {/*<ListItem className={classes.inlineBlock}>
              <a
                href="http://blog.creative-tim.com/?ref=mkr-footer"
                className={classes.block}
                target="_blank"
              >
                Blog
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.creative-tim.com/license?ref=mkr-footer"
                className={classes.block}
                target="_blank"
              >
                Licenses
              </a>
            </ListItem> */}
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} , criado com{" "}
          <Favorite className={classes.icon} color="error" /> por{" "}
          <a
            href="https://github.com/orgs/temalcoolgel/people"
            className={aClasses}
            target="_blank"
          >
            brasileiros
          </a>, para cada brasileiro <img src={brazilFlag}></img>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
  fixed: PropTypes.bool
};
