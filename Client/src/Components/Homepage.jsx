import {
  MDBContainer,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";

const Homepage = () => {
  return (
    <MDBContainer fluid className="landing-bg">
      
      {/* HERO SECTION */}
      <div className="hero-wrapper">
        <h4 className="top-text">RESTAURANT </h4>
        <h1 className="hero-title">
          Your restaurant, served online
        </h1>
        <p className="hero-subtext">
          Grow your business and deliver a premium experience
          your customers expect with our all-in-one solution.
        </p>

        <MDBBtn className="hero-btn">Get Started</MDBBtn>
      </div>

      {/* FOOD PREVIEW SECTION */}
      <MDBRow className="justify-content-center mt-5">
        <MDBCol md="7">
          <MDBCard className="food-card shadow-4">
            <MDBCardBody className="text-center">
                 <nav className="menu-links">
                {  localStorage.getItem("role")==="admin"?
                  <a href="">Dashbord</a>:null}
             
                <a href="#">Menu</a>
                <a href="#">Order Online</a>
                <a href="#">Book a Table</a>

              </nav>
              <div className="brand-name">MOLINA</div>

              <img
                src="food.avif"
                alt="food"
                className="food-img"
              />

           
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
};

export default Homepage;
