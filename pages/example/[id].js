import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { promises as fs } from 'fs'
import path from 'path'

import MainApp from "../../components/Main/MainApp";

import { setData, setFileName } from "../../actions";

const Example = (props) => {
    const { setData, post, setFileName, id } = props

    useEffect(() => {
        setFileName(`${id}.md`)
        setData(post)
        setButtonStatus({
            save: 'disabled',
            fileName: 'disabled',
            delete: 'disabled'
          })
    }, [])

    return (
        <MainApp />
    );
}

export const getStaticProps = async (context) => {
    const { params } = context
    const filePath = path.join(process.cwd(), 'public', 'examples', `${params.id}.md`)

        const post = await fs.readFile(filePath, 'utf8')
            .then(res => { return res.replace(/\r\n/g, "\n") })
        
    return {
        props: {
            post,
            id: params.id
        }
    }
}

export const getStaticPaths = async () => {
    return {
        paths: [
            { params: { id: 'test' } },
            { params: { id: 'test2' } },
            { params: { id: 'dompurify' } }
        ],
        fallback: true
    }
}

export default connect(null, { setData, setFileName })(Example)