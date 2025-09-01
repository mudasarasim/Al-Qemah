import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Button } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const testimonials = [
    {
        name: "Meera Kapoor",
        // title: "Homeowner",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4.5,
        text: "The attention to detail in their work is unmatched. Every curve, every cut… it speaks of heritage and heart. Truly an artisan's touch."
    },
    {
        name: "Rishi Verma",
        // title: "Architect",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        rating: 4,
        text: "From consultation to delivery, the process was seamless. The team listened to my ideas and delivered beyond expectation. Thank you for making my engagement ring so special!"
    },
    {
        name: "Aarav Sharma",
        // title: "Interior Designer",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
        text: "Their custom design process is so personal. I felt heard, understood, and the final result brought tears to my eyes. Thank you, Al Qemah."
    },
    {
        name: "Meera Kapoor",
        // title: "Homeowner",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4.5,
        text: "Impeccable service and even better jewelry. The team went above and beyond to customize my wedding set with subtle Arabic calligraphy."
    },
    {
        name: "Rishi Verma",
        // title: "Architect",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        rating: 4,
        text: "Visited their store and browsed their online gallery — both reflect their commitment to excellence. Honest pricing, luxurious designs."
    }
];

const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;

    for (let i = 0; i < full; i++) stars.push(<FaStar key={`full-${i}`} className="text-warning me-1" />);
    if (half) stars.push(<FaStarHalfAlt key="half" className="text-warning me-1" />);
    while (stars.length < 5) stars.push(<FaRegStar key={`empty-${stars.length}`} className="text-warning me-1" />);

    return stars;
};

const TestimonialSwiper = () => {
    return (
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 0' }}>
            <div className="text-center mb-5">
                <h2 className="fw-bold">What Our Clients Say</h2>
                <p className="text-muted">Real stories from real customers</p>
            </div>

            <div className="container">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop
                    autoplay={{ delay: 5000 }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        992: { slidesPerView: 3 }
                    }}
                >
                    {testimonials.map((testimonial, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="bg-white p-4 shadow rounded text-center h-100 d-flex flex-column justify-content-between">
                                <div>
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="rounded-circle mb-3"
                                        style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                                    />
                                    <h6 className="fw-semibold mb-0">{testimonial.name}</h6>
                                    <small className="text-muted">{testimonial.title}</small>
                                </div>
                                <p className="text-muted my-3" style={{ fontStyle: 'italic' }}>"{testimonial.text}"</p>
                                <div>{renderStars(testimonial.rating)}</div>
                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
                <a href="https://wa.me/971567968421" target="_blank" rel="noopener noreferrer">
                    <Button
                        variant="danger"
                        className="rounded-pill mt-4 px-4 py-2"
                        style={{
                            backgroundColor: '#232d39ff',
                            border: 'none',
                            fontWeight: '500',
                        }}
                    >
                        Contact Us →
                    </Button>
                </a>
            </div>

        </section>
    );
};

export default TestimonialSwiper;
