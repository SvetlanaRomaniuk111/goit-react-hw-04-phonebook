import ContactList from 'components/ContactList/ContactList';
import css from './components/ContactList/ContactList.module.css';

const App = () => {
  return (
    <div className={css.container}>
      <ContactList />
    </div>
  );
};

export default App;
