import { mount } from 'enzyme';
import NeedsPermission from '../NeedsPermission';
import { fakeUser, fakeUser2, fakeAdminUser, updateWrapper } from '../../../lib/testUtils';

describe('testing the <NeedsPermission/> component', () => {
    it('renders if the user has the ADMIN permission', async() => {
        const wrapper = mount(
            <NeedsPermission user={ fakeAdminUser() } neededPermission={ ['ADMIN'] }>
                <p className='test-child'>Success</p>
            </NeedsPermission>
        );

        await updateWrapper(wrapper);

        const shouldExist = wrapper.find('.test-child');
        expect(shouldExist.exists()).toBe(true);
    });
    it('does not render if the user does not have the ADMIN permission', async() => {
        const wrapper = mount(
            <NeedsPermission user={ fakeUser() } neededPermission={ ['ADMIN'] }>
                <p className='test-child'>Failed</p>
            </NeedsPermission>
        );
        await updateWrapper(wrapper);

        const shouldntExist = wrapper.find('.test-child');
        expect(shouldntExist.exists()).toBe(false);
    });
    it('renders if the user is the owner of the object', async() => {
        const user = fakeUser();
        const wrapper = mount(
            <NeedsPermission user={ user } ownerId={ user.id } neededPermission={ ['USER'] }>
                <p className='test-child'>Success</p>
            </NeedsPermission>
        );
        await updateWrapper(wrapper);

        const shouldExist = wrapper.find('.test-child');
        expect(shouldExist.exists()).toBe(true);
    });
    it('does not render if the user is not the owner of the object', async() => {
        const user = fakeUser();
        const trueOwner = fakeUser2();
        const wrapper = mount(
            <NeedsPermission user={ user } ownerId={ trueOwner.id } neededPermission={ [] }>
                <p className='test-child'>Failed</p>
            </NeedsPermission>
        );
        await updateWrapper(wrapper);

        const shouldntExist = wrapper.find('.test-child');
        expect(shouldntExist.exists()).toBe(false);
    });
});
