import {shallow} from "enzyme";
import Footer from "./Footer";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

describe('Footer Testing', () => {
    test('It should render Footer', () => {
       const component = shallow(<Footer/>);
       const wrapper = component.find('.footer');
       expect(wrapper).toBeTruthy();
    });
});