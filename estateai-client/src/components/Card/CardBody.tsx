// @material-ui/icons
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import React from 'react';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import styles from '../../assets/cardBodyStyle';

const useStyles = makeStyles(styles as any);

interface CardBodyProps {
    className?: string,
    plain?: boolean,
    profile?: boolean,
    chart?: boolean,
    children?: any,
}

export default function CardBody(props: CardBodyProps) {
  const classes = useStyles();
  const { className, children, plain, profile, ...rest } = props;
  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [classes.cardBodyPlain]: plain,
    [classes.cardBodyProfile]: profile,
    [className || '']: className !== undefined,
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
}