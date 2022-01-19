import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField } from '@material-ui/core/';
import { API } from '../Utils/Api'
import { MessageCard } from '../components/MessageCard';

const Contatos = () => {

    const [message, setMessage] = useState([]);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [validator, setValidator] = useState(false);
    const [render, __setRender] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(async () => {
        refreshMessages()
    }, [render])

    const refreshMessages = async () => {
        await API.get('/message')
            .then(response =>
                setMessage(response.data)
            )
    }
    const sendMessage = async () => {
        if (author.length <= 0 || content.length <= 0) {
            setValidator(true)
            return
        }
        const bodyForm = {
            email: author,
            message: content,
        }

        await API.post('/message', bodyForm)
            .then((response) => {
                if (response.status === 201) {
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 5000)

                    setAuthor('');
                    setContent('');
                    refreshMessages()
                }
            })
    }

    return (
        <>
            <Grid container
                direction='column'
                justify='center'
                spacing={2}
                alignItems="center"
            >
                <Grid item xs='auto' md={12} sm={12}>
                    <TextField id="name" label="Email" value={author} onChange={(event) => { setAuthor(event.target.value) }} required={true} fullWidth/>
                </Grid>
                <Grid item xs='auto' md={12} sm={12}>
                    <TextField id="message" label="Mensagem" value={content} onChange={(event) => { setContent(event.target.value) }} required={true} fullWidth/>
                </Grid>
                <Grid item xs='auto'  md={12} sm={12}>
                    <Button onClick={sendMessage} className="mt-2" variant="contained" color="primary">
                        Enviar
                    </Button>
                </Grid>
            </Grid>

            {validator &&
                <div className="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                    <strong>Por favor preencha todos os campos!</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>setValidator(false)}></button>
                </div>
            }

            {success &&
                <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
                    <strong>Mensagem foi enviada</strong>
                </div>
            }

            {message.length > 0 ?
                message.map((content, i) => {
                    return (<MessageCard content={content} key={i} />)
                })
                :
                ''
            }
        </>
    )
}

export default Contatos;
