import React, { useState, useEffect } from "react";
import { Movie, Loading } from 'components'
import { Input, Button } from "components"
import './Home.css'

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState([])
    const [query, setQuery] =useState('') // 검색 키워드 업데이트
    // 버튼 클릭에 따라 isSorted 상태 전환
    const [isSorted, setIsSorted] = useState(-1)

    useEffect(() => {
        fetch('https://yts.mx/api/v2/list_movies.json?quality=3D')
        .then(res => res.json())
        .then(result => {
            const {data: {movies}} = result
            console.log(movies)
            setLoading(false)
            setMovies(movies)
        })
    }, []) // 여러번 실행되지 않게 하기 위해 빈 배열 넣기

    // 입력한 키워드로 입력창 화면 설정
    const handleChange = (e) => {
        const {value} = e.target
        setQuery(value)
    }

    const sortByYear = (e) => {
        setIsSorted(isSorted * -1)
    }

    const homeUI = movies
                        // 입력한 키워드가 영화제목이나 장르에 포함되어 있으면 필터링해서 보여줌 
                        .filter(movie => {
                            const title = movie.title.toLowerCase() // 소문자로 변환
                            const genres = movie.genres.join(' ').toLowerCase()
                            const q = query.toLowerCase()

                            return title.includes(q) || genres.includes(q)
                        })
                        .sort((a,b) => {
                            return (b.year - a.year) * isSorted;
                        })
                        .map(movie => <Movie
                                        key={movie.id}
                                        title={movie.title}
                                        genres={movie.genres}
                                        cover={movie.medium_cover_image}
                                        summary={movie.summary}
                                        year={movie.year}/>
                                        )
    
    return (
        <>
            {loading? <Loading/>: <div className='Home-container'>
                                    <Input name='serch' type='text' placeholder='Search movies ...'
                                        value={query} onChange={handleChange}/>
                                        <Button handleClick={sortByYear}>정렬</Button>
                                    <div className='Home-movies'>{homeUI}</div>
                                    </div>}
        </>
    )
}

export default Home