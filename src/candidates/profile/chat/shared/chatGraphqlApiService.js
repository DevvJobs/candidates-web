import apolloClient from '@/candidates/core/apollo/client';
import gql from 'graphql-tag';

class ChatGraphqlApiService {
  constructor (apolloClient) {
    this.apolloClient = apolloClient;
  }

  getContacts () {
    return this.apolloClient.query({
      query: gql`
        query{
          contacts{
            company {
              name
            }
            id
            lastMessage{
              date
              sender {
                type
                name
              }
              text
            }
            status
            latestRepresentative
            unreadMessagesCount
          }
        }
      `
    }).then(res => {
      return res.data.contacts;
    });
  }
  getArchivedContacts () {
    return this.apolloClient.query({
      query: gql`
        query{
          archivedContacts{
            company {
              name
            }
            id
            lastMessage{
              date
              sender {
                type
                name
              }
              text
            }
            status
            latestRepresentative
            unreadMessagesCount
          }
        }
      `
    }).then(res => res.data.archivedContacts);
  }

  getContactMessages (contactId) {
    return this.apolloClient.query({
      query: gql`
        query($contactId: UUIDv4!) {
          messages(contactId: $contactId){
            date
            sender {
              name
              type
            }
            sender {
              type
              name
            }
            text
          }
        }
      `,
      variables: {
        contactId: contactId
      }
    }).then(res => res.data.messages);
  }
  getCountries (namePartial = '') {
    return this.apolloClient.query({
      query: gql`
        query Location($item: String!) {
          locations(query: $item) {
            id
            name
            type
          }
        }
      `,
      variables: {
        item: namePartial
      }
    }).then(res => res.data.locations);
  }

  updateContactRequestStatus (contactId, status) {
    const variables = {
      id: contactId,
      contactStatus: status
    };

    return apolloClient.mutate({
      mutation: gql`
        mutation UpdateContactRequest(
          $id: ID!,
          $contactStatus: String!
        ) {
          updateContactRequest(id: $id, contactStatus: $contactStatus) {
            errors {
              id {
                error
                message
              }
              contactStatus {
                error
                message
              }
            }
            success
          }
        }
      `,
      variables: variables
    }).then(res => res.data.updateContactRequest.success);
  }

  addMessage (contactId, messageText) {
    const variables = {
      contactId: contactId,
      text: messageText
    };
    return apolloClient.mutate({
      mutation: gql`
        mutation addMessage(
          $contactId: UUIDv4!,
          $text: String!
        ) {
          addMessage(contactId: $contactId, text: $text) {
            success
          }
        }
      `,
      variables: variables
    }).then(res => res.data.addMessage.success);
  }

  blockContact (contactId) {
    return apolloClient.mutate({
      mutation: gql`
        mutation blockContact(
          $id: ID!
        ) {
          blockContact(id: $id) {
            errors {
              id {
                error
                message
              }
            }
            success
          }
        }
     `,
      variables: {
        id: contactId
      }
    }).then(res => res.data.blockContact);
  }
  archiveContact (contactId) {
    return apolloClient.mutate({
      mutation: gql`mutation archiveContact($id: UUIDv4!){
      archiveContact(id: $id){
        errors{
          id {
            error
            message
          }
          base {
            error
            message
          }
        }
        success
      }
    }`,
      variables: {
        id: contactId
      }
    }).then(res => res.data.archiveContact);
  }
  massArchiveContact (contactIds) {
    return apolloClient.mutate({
      mutation: gql`mutation massArchiveContact($ids: [UUIDv4!]!){
      massArchiveContact(ids: $ids){
        errors{
          ids {
            error
            message
          }
          base {
            error
            message
          }
        }
        success
      }
    }`,
      variables: {
        ids: contactIds
      }
    }).then(res => res.data.massArchiveContact);
  }
}

export default new ChatGraphqlApiService(apolloClient);
