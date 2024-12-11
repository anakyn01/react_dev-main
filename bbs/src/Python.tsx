import {Button, Container,Row,Col, Card, Figure} from 'react-bootstrap';

const Python = () => {
    return(
<>
<Container>
<Row>
<Col sm={6}>
<Figure className="mt-3">
    <Figure.Image
    width={171} height={180} alt="171 X 180" src=""
    />
</Figure>
</Col>
<Col sm={6}>
<Figure className="mt-3">
    <Figure.Image
    width={171} height={180} alt="171 X 180" src=""
    />
</Figure>
</Col>   
</Row>
</Container>

<Container>
<Row>
<Col sm={4}>
<Card className='mt-3'>
    <Card.Img variant="top" src="holder.js/100px180"/>
    <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.     
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
    </Card.Body>
</Card>
</Col>
<Col sm={4}>
<Card className='mt-3'>
    <Card.Img variant="top" src="holder.js/100px180"/>
    <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.     
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
    </Card.Body>
</Card>
</Col>
<Col sm={4}>
<Card className='mt-3'>
    <Card.Img variant="top" src="holder.js/100px180"/>
    <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.     
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
    </Card.Body>
</Card>
</Col>
</Row>
</Container>
</>
    )
}
export default Python;