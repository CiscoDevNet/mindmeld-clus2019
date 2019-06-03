import uuid from 'uuid';
import storage from 'store';


// Set a persistent id for tracking
storage.set('clientId', storage.get('clientId') || uuid.v4());
