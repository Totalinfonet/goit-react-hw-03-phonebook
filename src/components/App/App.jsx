import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import { AppWrapper, Title } from './App.styled';

const initialContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];
export class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  componentDidMount() {
    const contactsFromLocalStorage = this.getContactsFromLocalStorage();
    if (contactsFromLocalStorage) {
      this.setState({ contacts: contactsFromLocalStorage });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  getContactsFromLocalStorage() {
    const contacts = localStorage.getItem('contacts');
    if (!contacts) {
      localStorage.setItem('contacts', JSON.stringify(initialContacts));
      return initialContacts;
    }
    return JSON.parse(contacts);
  }

  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const { contacts } = this.state;
    const isNameExists = contacts.some(contact => contact.name === name);
    if (isNameExists) {
      alert(`${name} is already in contacts.`);
      return;
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  deleteContact = id => {
    this.setState(
      prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      }),
      () => {
        if (this.state.contacts.length === 0) {
          localStorage.clear();
        }
      }
    );
  };

  handleFilterChange = e => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <AppWrapper>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.addContact} />
        <Title>Contacts</Title>
        <Filter filter={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </AppWrapper>
    );
  }
}
