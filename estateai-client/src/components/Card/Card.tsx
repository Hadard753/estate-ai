// @material-ui/icons
// nodejs library that concatenates classes
import classNames from 'classnames';
import React from 'react';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import styles from '../../assets/cardStyle';

const useStyles = makeStyles(styles as any);

interface CardProps {
    className?: string,
    plain?: boolean,
    profile?: boolean,
    chart?: boolean,
    children?: any,
}

export default function Card(props: CardProps) {
  const classes = useStyles();
  const { className, children, plain, profile, chart, ...rest } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
    [className || '']: (className !== undefined),
  });
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}
