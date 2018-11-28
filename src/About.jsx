import React, { Component } from "react";
import "./css/about.css";

class About extends Component {

    render() {
        return (
            <div>

                <div className="container">

                    <section id="SectionAbout">
                        <h1>About</h1>
                        <p className="lead">
                            We know that there’re many amazing colleges and universities in the united states. Although finding the
                            right one might be tiring, we hope to be a support on this amazing journey. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Quaerat sequi esse, nam beatae ducimus rerum aperiam eaque iusto
                            inventore debitis reprehenderit pariatur voluptas tempora laborum ullam, in, ipsa vitae doloremque!.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae mollitia et, assumenda modi odio
                            quo fugiat, optio recusandae voluptate illum amet quae ad non dolores eligendi exercitationem quod iure
                            consequatur.
                                <br />
                            <br />
                            The creation of this web app in this space is to simply
                            address the inaccessibility of colleges information and to present it with beautiful UI elements that
                                will make the user experience a lot better than what we experience on the web today. Tailored for:</p>

                        <ul>
                            <li>
                                High school Gradates
                                </li>
                            <li>
                                Transferring students
                                 </li>
                            <li>
                                And simply for anyone who’s interested in finding out more about a college.
                                 </li>
                        </ul>

                    </section>
                </div>

                <section id="team">
                    <div className="container">
                        <h2 id="TeamH1">Our Team</h2>
                        <div className="card-deck">
                            <div className="card">
                                <img className="card-img-top cardImg" src='/imgs/alex-iby-343837-unsplash.jpg' alt="Team member one" />
                                <div className="card-body">
                                    <h5 className="card-title">Mikias Lema</h5>
                                    <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex hic, debitis,
                                                             nulla incidunt est earum perspiciatis fugit rerum ipsam dolorem exercitationem vitae.</p>
                                </div>
                            </div>
                            <div className="card">
                                <img className="card-img-top cardImg" src='/imgs/eric-froehling-311481-unsplash.jpg' alt="Team member two" />
                                <div className="card-body">
                                    <h5 className="card-title">Eric Forehling</h5>
                                    <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex hic, debitis,
                                                             nulla incidunt est earum perspiciatis fugit rerum ipsam dolorem exercitationem vitae.</p>

                                </div>
                            </div>
                            <div className="card">
                                <img className="card-img-top cardImg" src='/imgs/albert-dera-397063-unsplash.jpg' alt="Team member three" />
                                <div className="card-body">
                                    <h5 className="card-title">Albert Dera</h5>
                                    <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex hic, debitis,
                                                             nulla incidunt est earum perspiciatis fugit rerum ipsam dolorem exercitationem vitae.</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container">
                    <section>
                        <h3>
                            Usage
                            </h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Quia a, velit sint dignissimos labore, odit sed, sunt
                            similique nihil voluptatibus maxime rem eius id
                            necessitatibus minima nobis unde ipsum sapiente.Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                            Quia a, velit sint dignissimos labore, odit sed, sunt
                            similique nihil voluptatibus maxime rem eius id
                            necessitatibus minima nobis unde ipsum sapiente.Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                            Quia a, velit sint dignissimos labore, odit sed, sunt
                            similique nihil voluptatibus maxime rem eius id
                                necessitatibus minima nobis unde ipsum sapiente.</p>

                        <ol>
                            <li>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio voluptatibus quisquam
                                dignissimos dolor sed inventore officiis praesentium omnis, nobis nihil eveniet magni nisi non
                                        natus. Sint nemo asperiores in eveniet. </li>

                            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam aliquid tempore eligendi
                                suscipit modi! Rerum harum consequatur nisi. Sit temporibus voluptatibus, fuga illo repudiandae
                                        eius sapiente aperiam deleniti dolore quod!</li>

                        </ol>


                    </section>

                </div>



            </div>
        );
    }
}

export default About;