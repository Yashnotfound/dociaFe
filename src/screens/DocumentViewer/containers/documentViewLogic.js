import { useState, useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';

export const documentViewLogic = ({id}) => {
    const [document, setDocument] = useState(null);

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/documents/${id}`);
                setDocument(response.data);
            } catch (err) {
               toast.error("Failed to fetch document.");
            }
        };
        
        fetchDocument();

    }, [id]);

    return document;
};
