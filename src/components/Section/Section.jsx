import PropTypes from 'prop-types';
import s from 'components/Section/Section.module.css';
const Section = ({ children }) => (
  <section className={s.container}>{children}</section>
);

export default Section;

Section.propTypes = {
  children: PropTypes.node.isRequired,
};
