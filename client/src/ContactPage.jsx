import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import './css/ContactPage.css';
import CrossComponent from './components/CrossComponent';
import { useEffect, useState } from 'react';

export default function ContactPage() {

    var notyf = new Notyf({
        types: [
            {
                type: 'error',
                duration: 5000,
                dismissible: true
            }
        ]
    });

    const [formFormat, setFormFormat] = useState('evolved');
    const [firtNameInput, setFirtNameInput] = useState('');
    const [lastNameInput, setLastNameInput] = useState('');
    const [companyInput, setCompanyInput] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [detailsInput, setDetailsInput] = useState('');
    const [budgetSelect, setBudgetSelect] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [classicEmailInput, setclassicEmailInput] = useState('');
    const [classicSubjectInput, setclassicSubjectInput] = useState('');
    const [classicDetailsInput, setclassicDetailsInput] = useState('');
    const [classicDetailsInputCounter, setclassicDetailsInputCounter] = useState(0);
    const [requestSended, setRequestSended] = useState(false);
    const [honeypotInput1, setHoneypotInput1] = useState(false);
    const [honeypotInput2, setHoneypotInput2] = useState(false);

    const handleHoneypot1 = (event) => {
        setHoneypotInput1(event.target.value)
    }

    const handleHoneypot2 = (event) => {
        setHoneypotInput2(event.target.value)
    }

    const handlefirtNameInputChange = (event) => {
        setFirtNameInput(event.target.value)
    }

    const handlelastNameInputChange = (event) => {
        setLastNameInput(event.target.value)
    }

    const handlecompanyInputChange = (event) => {
        setCompanyInput(event.target.value)
    }

    const handleselectedSubjectChange = (event) => {
        setSelectedSubject(event.target.value)
    }

    const handledetailsInputChange = (event) => {
        setDetailsInput(event.target.value)
    }

    const handlebudgetSelectChange = (event) => {
        setBudgetSelect(event.target.value)
    }

    const handleemailInputChange = (event) => {
        setEmailInput(event.target.value)
    }

    const handleFormFormatChange = () => {
        formFormat === 'evolved' ? setFormFormat('classic') : setFormFormat('evolved')
    }

    const handleclassicEmailInputChange = (e) => {
        setclassicEmailInput(e.target.value)
    }

    const handleclassicSubjectInputChange = (e) => {
        setclassicSubjectInput(e.target.value)
    }

    const handleclassicDetailsInputChange = (e) => {
        setclassicDetailsInputCounter(e.target.value.length)
        setclassicDetailsInput(e.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let data = {}

        if (honeypotInput1 || honeypotInput2) {
            notyf.error("Hop hop hop ! pas de robot ici !")
            return
        }

        if (formFormat === 'evolved') {

            if (firtNameInput === '' || firtNameInput.trim().length === 0 || lastNameInput === '' || lastNameInput.trim().length === 0 || selectedSubject === '' || emailInput === '') {
                notyf.error("Veuillez remplir le formulaire en entier")
                return
            }

            if (selectedSubject === 'website' && budgetSelect === '') {
                notyf.error("Veuillez indiquer un budget")
                return
            }

            data = {
                type: 'evolved',
                firstName: firtNameInput,
                lastName: lastNameInput,
                company: companyInput,
                subject: selectedSubject,
                details: detailsInput,
                budget: budgetSelect,
                email: emailInput
            }

        } else {
            if (classicEmailInput === '' || classicSubjectInput === '' || classicSubjectInput.trim().length === 0 || classicDetailsInput === '' || classicDetailsInput.length < 150 || classicDetailsInput.trim().length === 0) {
                notyf.error("Veuillez remplir le formulaire en entier")
                return
            }

            data = {
                type: 'classic',
                subject: classicSubjectInput,
                details: classicDetailsInput,
                email: classicEmailInput
            }
        }

        setRequestSended(true)
        fetch("/sendMail", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => {
                setRequestSended(false)
                if (data.response === 'error') {
                    if (data.type === 2) {
                        notyf.error("On dirait que vous aimez vraiment mon formulaire mais ça fait beaucoup d'envois ! Merci de résayer dans 1h ")
                        return
                    }
                    notyf.error("Une erreur s'est produite, je travaille déjà dessus ! Merci de réessayer ultérieurement")
                } else {
                    notyf.success("Merci, je vous répond dès que possible !")
                }
            })
            .catch((error) => {
                setRequestSended(false)
                notyf.error("Une erreur s'est produite, je travaille déjà dessus ! Merci de réessayer ultérieurement")
            });

    }

    return (
        <>
            <CrossComponent />
            <div className='container'>
                <h1>Me contacter</h1>
                <form action="submit" method='POST' onSubmit={handleSubmit}>
                    {formFormat === 'evolved' && (
                        <div className='content-container'>
                            <div className='contact-text'>
                                <input onChange={handleHoneypot1} value={honeypotInput1} type="text" name="fax" id="fax1" style={{ display: 'none' }} autoComplete="off" />
                                <p>"Bonjour Mathis, je suis</p>
                                <input onChange={handlefirtNameInputChange} value={firtNameInput} name="firtNameInput" style={{ width: 20 + "%", minWidth: 100 + "px" }} type="text" placeholder="Votre Prénom" />
                                <input onChange={handlelastNameInputChange} value={lastNameInput} name="lastNameInput" style={{ width: 20 + "%", minWidth: 100 + "px" }} type="text" placeholder="Votre Nom" />
                                <p>de</p>
                                <input onChange={handlecompanyInputChange} value={companyInput} name="companyInput" style={{ width: 20 + "%", minWidth: 200 + "px" }} type="text" placeholder="Votre Entreprise" />
                                <p>.</p>
                            </div>
                            <div className='contact-text'>
                                <p>J'aimerais discuter</p>
                                <select onChange={handleselectedSubjectChange} value={selectedSubject} name="subjectInput" style={{ width: 50 + "%", minWidth: 300 + "px" }}>
                                    <option className='' value=""></option>
                                    <option value="website">de la création d'un site</option>
                                    <option value="project">d'un projet</option>
                                    <option value="job">d'une proposition d'emplois</option>
                                    <option value="help">d'une demande d'aide</option>
                                    <option value="other">d'autre chose</option>
                                </select>
                                <p>avec toi .</p>
                            </div>
                            <div className='contact-text'>
                                <p>Voici plus de détails :</p>
                            </div>
                            <div className='contact-text'>
                                <textarea onChange={handledetailsInputChange} value={detailsInput} name="detailsInput" id="" cols="30" rows="3" ></textarea>
                            </div>

                            {selectedSubject === 'website' && (
                                <div className='contact-text'>
                                    <p>Mon budget pour se projet est de</p>
                                    <select onChange={handlebudgetSelectChange} value={budgetSelect} name="budgetSelect" id="">
                                        <option value=""></option>
                                        <option value="max1000">moins de 1000</option>
                                        <option value="max5000">1000-5000</option>
                                        <option value="max10000">5000-10000</option>
                                        <option value="min10000">plus de 10000</option>
                                    </select>
                                    <p> € .</p>
                                </div>
                            )}

                            <div className="contact-text">
                                <p>Mon email est</p>
                                <input onChange={handleemailInputChange} value={emailInput} name="emailInput" style={{ width: 40 + "%", minWidth: 200 + "px" }} type="email" placeholder="Votre Email" />
                                <p>.</p>
                            </div>
                            <div className="contact-text">
                                <p>Bonne journée.</p>
                            </div>
                        </div>
                    )}
                    {formFormat === 'classic' && (
                        <div className='content-container classic'>
                            <input onChange={handleHoneypot2} value={honeypotInput2} type="text" name="fax" id="fax2" style={{ display: 'none' }} autoComplete="off" />
                            <input onChange={handleclassicEmailInputChange} value={classicEmailInput} name="classicEmailInput" style={{ width: 40 + "%", minWidth: 200 + "px" }} type="email" placeholder="Votre Email" />
                            <input onChange={handleclassicSubjectInputChange} value={classicSubjectInput} name="classicSubjectInput" style={{ width: 40 + "%", minWidth: 200 + "px" }} type="text" placeholder="Sujet" />
                            <textarea onChange={handleclassicDetailsInputChange} value={classicDetailsInput} name="classicDetailsInput" placeholder='Message' cols="30" rows="5" ></textarea>
                            <p className='minText'>Minimum 150 caractères
                                {classicDetailsInputCounter < 150 ? ` (${150 - classicDetailsInputCounter} restant)` : ''}
                            </p>
                        </div>
                    )}
                    <div className='form-footer'>
                        <button type='button' className='btn-s' onClick={handleFormFormatChange}>Autre format</button>
                        {!requestSended ?
                            <button type='submit'>Envoyer</button>
                            : <button className='disabled' disabled type='submit'>Envois en cours</button>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}