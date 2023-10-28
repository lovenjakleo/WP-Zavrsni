import React, { Component } from "react";
import KnjigaDataService from "../../services/knjiga.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class DodajKnjigu extends Component {

  constructor(props) {
    super(props);
    
    
    this.dodajKnjigu = this.dodajKnjigu.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async dodajKnjigu(knjiga) {
    const odgovor = await KnjigaDataService.post(knjiga);
    if(odgovor.ok){
      // routing na smjerovi
      window.location.href='/knjige';
    }else{
      // pokaži grešku
     // console.log(odgovor.poruka.errors);
      let poruke = '';
      for (const key in odgovor.poruka.errors) {
        if (odgovor.poruka.errors.hasOwnProperty(key)) {
          poruke += `${odgovor.poruka.errors[key]}` + '\n';
         // console.log(`${key}: ${odgovor.poruka.errors[key]}`);
        }
      }

      alert(poruke);
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

    let naslov=0;
    if (podaci.get('naslov').trim().length>0){
     naslov =podaci.get('naslov')
    }

    this.dodajKnjigu({
      isbn: podaci.get('isbn'),
      naslov: naslov,
      autor:podaci.get('autor'),
      dostupna_kolicina:podaci.get('dostupna_kolicina'),
      
    });
    
  }


  render() { 
    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


          <Form.Group className="mb-3" controlId="isbn">
            <Form.Label>Isbn</Form.Label>
            <Form.Control type="text" name="isbn" placeholder="isbn knjige" maxLength={255} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="naslov">
            <Form.Label>Naslov</Form.Label>
            <Form.Control type="text" name="naslov" placeholder="130" />
          </Form.Group>


          <Form.Group className="mb-3" controlId="autor">
            <Form.Label>Autor</Form.Label>
            <Form.Control type="text" name="autor" placeholder="500" />
            <Form.Text className="text-muted">
             Ne smije biti negativna
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="dostupna_kolicina">
            <Form.Label>Dostupna kolicina</Form.Label>
            <Form.Control type="text" name="dostupna_kolicina" placeholder="50" />
          </Form.Group>

          

          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/knjige`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Dodaj knjigu
            </Button>
            </Col>
          </Row>
         
          
        </Form>


      
    </Container>
    );
  }
}

