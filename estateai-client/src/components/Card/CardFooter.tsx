// @material-ui/icons
// nodejs library that concatenates classes
import classNames from 'classnames';
import React from 'react';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import styles from '../../assets/cardFooterStyle';

const useStyles = makeStyles(styles as any);

interface CardFooterProps {
    className?: string,
    plain?: boolean,
    profile?: boolean,
    stats?: boolean,
    icon?: boolean,
    children?: any,
    chart?: boolean,
}

export default function CardFooter(props: CardFooterProps) {
const classes = useStyles();
  const { className, children, plain, profile, stats, chart, ...rest } = props;
  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [classes.cardFooterPlain]: plain,
    [classes.cardFooterProfile]: profile,
    [classes.cardFooterStats]: stats,
    [classes.cardFooterChart]: chart,
    [className || '']: className !== undefined,
  });
  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  );
}
