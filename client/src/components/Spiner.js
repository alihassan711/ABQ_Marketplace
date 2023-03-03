import Spinner from 'react-bootstrap/Spinner';

export default function SpinnerExp() {
    return <>
        <div className='spinner'>
            <Spinner animation="border" variant="info" className='spin' />
            <h1 className='spin-h1 text-info'>Loading</h1>
        </div>
    </>
}
