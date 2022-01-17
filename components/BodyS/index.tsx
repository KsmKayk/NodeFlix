import type {NextComponentType} from "next"
import HeadS from '../HeadS'

const BodyS: NextComponentType = (props) => {
    return (
        <>
            <HeadS/>
            {props.children}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"></script>
        </>
    )
}

export default BodyS