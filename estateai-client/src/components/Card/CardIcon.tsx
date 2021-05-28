// @material-ui/icons
// nodejs library that concatenates classes
import classNames from 'classnames';
import React from 'react';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import styles from '../../assets/cardIconStyle.js';
import { ColorsEnum } from '../Table/Table';

const useStyles = makeStyles(styles as any);

interface CardIconProps {
    className?: string,
    color?: ColorsEnum,
    children?: any,
}

export default function CardIcon(props: CardIconProps) {
  const classes = useStyles();
  const { className, children, color, ...rest } = props;
  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    [classes[color + "CardHeader"]]: color,
    [className || '']: className !== undefined,
  });
  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
}