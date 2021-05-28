// @material-ui/icons
// nodejs library that concatenates classes
import classNames from 'classnames';
import React from 'react';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import styles from '../../assets/cardHeaderStyle';
import { ColorsEnum } from '../Table/Table';

const useStyles = makeStyles(styles as any);

interface CardHeaderProps {
    className?: string,
    color: ColorsEnum,
    plain?: boolean,
    stats?: boolean,
    icon?: boolean,
    children?: any,
}

export default function CardHeader(props: CardHeaderProps) {
  const classes = useStyles();
  const { className, children, color, plain, stats, icon, ...rest } = props;
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color + "CardHeader"]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [className || '']: className !== undefined,
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}
