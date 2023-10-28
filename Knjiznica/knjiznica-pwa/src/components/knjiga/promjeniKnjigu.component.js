import React, { Component } from "react";
import KnjigaDataService from "../../services/knjiga.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";



export default class PromjeniKnjigu extends Component {

  constructor(props) {
    super(props);
    

   
    this.knjiga = this.dohvatiKnjigu();
    this.promjeniKnjigu = this.promjeniKnjigu.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    

    this.state = {
      knjiga: {}
    };

  }



  async dohvatiKnjigu () {
    let href = window.location.href;
    let niz = href.split('/'); 
    await KnjigaDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          kontakt: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    
   
  }

  async promijeniKnjigu(knjiga) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await KnjigaDataService.put(niz[niz.length-1],knjiga);
    if(odgovor.ok){
      // routing na smjerovi
      window.location.href='/knjige';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }



  handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const podaci = new FormData(e.target);
    //Object.keys(formData).forEach(fieldName => {
    // console.log(fieldName, formData[fieldName]);
    //})
    
    //console.log(podaci.get('verificiran'));
    // You can pass formData as a service body directly:

    this.promjeniKnjigu({
      isbn: podaci.get('isbn'),
      naslov:podaci.get('naslov'),
      autor: podaci.get('autor'),
      dostupna_kolicina: podaci.get('dostupna_kolicina'),
      
    });
    
  }


  render() {
    
   const { knjiga} = this.state;


    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


          <Form.Group className="mb-3" controlId="isbn">
            <Form.Label>Isbn</Form.Label>
            <Form.Control type="text" name="isbn" placeholder="Isbn knjige"
            maxLength={255} defaultValue={knjiga.isbn} required />
          </Form.Group>


          <Form.Group className="mb-3" controlId="naslov">
            <Form.Label>Naslov</Form.Label>
            <Form.Control type="text" name="naslov" defaultValue={knjiga.naslov}  placeholder="130" />
          </Form.Group>


          <Form.Group className="mb-3" controlId="autor">
            <Form.Label>Autor</Form.Label>
            <Form.Control type="text" name="autor" defaultValue={knjiga.autor}  placeholder="500" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="dostupna_kolicina">
            <Form.Label>Dostupna Kolicina</Form.Label>
            <Form.Control type="text" name="dostupna_kolicina" defaultValue={knjiga.dostupna_kolicina}  placeholder="50" />
          </Form.Group>

          

        
         
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/knjige`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Promjeni knjigu
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}

