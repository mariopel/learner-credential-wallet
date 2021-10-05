import { StyleSheet } from 'react-native';

import { mixins, theme } from '../../styles';

export default StyleSheet.create({
  credentialStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.backgroundSecondary,
    borderRadius: theme.borderRadius,
    width: '100%',
    height: 40,
  },
  statusText: {
    fontFamily: theme.fontFamily.bold,
    fontSize: 14,
    color: theme.color.textPrimary,
    paddingLeft: 8,
  },
  approvalContainer: {
    ...mixins.buttonGroup,
    display: 'flex',
    marginTop: 16,
  },
  acceptButton: {
    ...mixins.button, 
    ...mixins.buttonPrimary,
    marginLeft: 16,
    height: 36,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  declineButton: {
    ...mixins.button,
    backgroundColor: theme.color.buttonSecondary,
    height: 36,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  brightActionText: {
    color: theme.color.textPrimary,
    fontSize: 14,
    fontFamily: theme.fontFamily.medium,
  },
  darkActionText: {
    color: theme.color.textPrimaryDark,
    fontSize: 14,
    fontFamily: theme.fontFamily.medium,
  },
});