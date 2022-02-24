import React from 'react';
import { Form, Button } from 'react-bootstrap';
import logo from '../../Image/logo.png'

export default function Footer() {
  return (
    <>
      <div className="d-flex flex-row justify-content-center flex-wrap text-white bg-dark pt-5 pb-5">
        <div className="d-flex flex-column box2 justify-content-around m-2">
          <div className="d-flex flex-row  justify-content-start pb-4">
            <img className='mr-1 '
              src={logo}
              width='80px' height='80px' />
            <h2 className='my-auto flex-fill pl-3' style={{ fontWeight: '900', color: "#28ca2f" }}>Agricon</h2>
          </div>
          <p>Evulates vast a real proven works discount secure care. Market invigorate a awesome.</p>
          <p>Odor to yummy high racy bonus soaking mouthwatering. Evulates vast a real proven works discount secure care. Market invigorate a awesome handcrafted bigger comes newer.</p>
          <p>© 2020, Agricom. All rights reserved.</p>
        </div>
        <div className="d-flex flex-column box2 justify-content-around m-2">
          <div className="d-flex flex-row  justify-content-start mt-4">
            <h4 className='flex-fill' style={{ fontWeight: '700' }}>Contacts</h4>
          </div>
          <p>Mega bold action. Sold care wherever less appetizing your far easily</p>
          <p><i className="fa fa-map-marker pr-3"></i>523 Sylvan Ave, 5th Floor Mountain View</p>
          <p><i className="fa fa-phone pr-3"></i>Market invigorate</p>
          <p><i className="fa fa-envelope pr-3"></i>Market invigorate</p>

          <p>
            <a href='#' className='text-light'><i className="fa fa-twitter m-3" /></a>
            <a href='#' className='text-light'><i className="fa fa-linkedin m-3" /></a>
            <a href='#' className='text-light'><i className="fa fa-youtube m-3" /></a>
            <a href='#' className='text-light'><i className="fa fa-facebook-f m-3" /></a>
            <a href='#' className='text-light'><i className="fa fa-google-plus m-3" /></a>
            <a href='#' className='text-light'><i className="fa fa-instagram m-3" /></a>
          </p>
        </div>
        <div className="d-flex flex-column box2 justify-content-around m-2">
          <div className="d-flex flex-row  justify-content-start mt-4">
            <h4 className='flex-fill' style={{ fontWeight: '700' }}>Get In Touch</h4>
          </div>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
             </Form.Text>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Comment</Form.Label>
              <Form.Control as="textarea" placeholder="Write Your Thoughts" rows="3" />
            </Form.Group>
            <Button variant="success" type="submit" block>
              Send Message
            </Button>
          </Form>
        </div>
      </div>
    </>

  );

}
