import MicIcon from '@mui/icons-material/Mic';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import { styled } from '@mui/system';
import CustomSearchButton from 'components/button/CustomSearchButton';
import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast'; // Import react-hot-toast
import COLORS from 'theme/colors';

import ListeningSnackbar from './ListeningSnackbar';

const Container = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '16px',
});

const CustomTextField = styled(TextField)({
  width: '100%',
  backgroundColor: COLORS.secondary.main,
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: COLORS.blue[6],
  },
});

interface SearchBoxAppProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: () => void;
  placeholder?: string;
  buttonLabel?: string;
}

type Language = 'th-TH' | 'en-US';

const languageNames: Record<Language, string> = {
  'th-TH': 'TH',
  'en-US': 'EN',
};

const SearchBoxApp: React.FC<SearchBoxAppProps> = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  placeholder = 'ค้นหา...',
  buttonLabel = 'ค้นหา',
}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('th-TH');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  // eslint-disable-next-line no-undef
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    handleLanguageMenuClose();
  };

  const startListening = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = language;
      recognitionRef.current.continuous = true; // Enable continuous listening
      recognitionRef.current.interimResults = true; // Enable interim results for faster feedback

      // eslint-disable-next-line no-undef
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = 0; i < event.results.length; i++) {
          const { transcript } = event.results[i][0];
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // Set interim results first for quick feedback
        if (interimTranscript) {
          setSearchTerm(interimTranscript);
        }

        // Set final results once available
        if (finalTranscript) {
          setSearchTerm(finalTranscript);
        }
      };

      // eslint-disable-next-line no-undef
      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        if (event.error === 'no-speech') {
          toast.error('ไม่มีการพูด, โปรดลองอีกครั้ง');
        } else if (event.error === 'audio-capture') {
          toast.error('ไม่พบไมโครโฟน, กรุณาตรวจสอบการเชื่อมต่อของไมโครโฟน');
        } else if (event.error === 'not-allowed') {
          toast.error(
            'การใช้งานไมโครโฟนถูกบล็อก, กรุณาอนุญาตการใช้งานไมโครโฟน'
          );
        } else {
          toast.error(`เกิดข้อผิดพลาด: ${event.error}`);
        }
        setIsListening(false);
        setSnackbarOpen(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setSnackbarOpen(false);
      };

      recognitionRef.current.start();
      setIsListening(true);
      setSnackbarOpen(true);
    } else {
      toast.error('เบราว์เซอร์ของคุณไม่รองรับการใช้ Speech Recognition');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    setSnackbarOpen(false);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <Container>
      <CustomTextField
        variant="outlined"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        fullWidth
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleLanguageMenuOpen} size="small">
                {language === 'th-TH' ? 'TH' : 'EN'}
              </IconButton>
              <MicIcon
                style={{
                  cursor: 'pointer',
                  color: isListening ? COLORS.red[5] : COLORS.blue[6],
                  marginLeft: '8px',
                }}
                onClick={toggleListening}
              />
            </InputAdornment>
          ),
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleLanguageMenuClose}
      >
        {Object.entries(languageNames).map(([langCode, langName]) => (
          <MenuItem
            key={langCode}
            onClick={() => changeLanguage(langCode as Language)}
            selected={langCode === language}
          >
            {langName}
          </MenuItem>
        ))}
      </Menu>
      <CustomSearchButton
        label={buttonLabel}
        onClick={onSearch}
        startIcon={<SearchIcon />}
      />
      <ListeningSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        onStopListening={stopListening} // Pass stopListening function
      />
    </Container>
  );
};

export default SearchBoxApp;
