import { LightningElement, track } from 'lwc';

import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import TOPIC_OBJECT from '@salesforce/schema/Category__c';
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

    createTopicRecord() {
        //Validation
        let topicInputContainer = this.template.querySelector(".topic-container");
        const topicErrorMessage = this.template.querySelector(".topic-error-msg");
        if (!this.topic) {
            topicInputContainer.classList.add("slds-has-error");
            topicErrorMessage.innerText = 'Topic Name value is required';
            return;
        } else {
            topicInputContainer.classList.remove("slds-has-error");
            topicErrorMessage.innerText = '';
        }

        const fields = {};
        fields[TOPIC_FIELD.fieldApiName] = this.topic;
        fields[DESCRIPTION_FIELD.fieldApiName] = this.description;
        const recordInput = { apiName: TOPIC_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(topic => {
                // Clear New Topic Creation form
                this.topic = '';
                this.description = '';
                this.closeModal();
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'New topic has been successfully created',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating new topic',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }
}