import { LightningElement, track } from 'lwc';

import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import TOPIC from '@salesforce/schema/Category__c';
import TOPIC_FIELD from '@salesforce/schema/Category__c.Category__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Category__c.Description__c';

export default class Topics extends LightningElement {
    @track openModal = false;
    showModal() {
        this.openModal = true;
    }
    closeModal() {
        this.openModal = false;
    }

    @track topic = '';
    @track description = '';

    handleTopicChange(event) {
        this.topic = event.target.value;
    }

    handleDescriptionChange(event) {
        this.description = event.target.value;
    }
}